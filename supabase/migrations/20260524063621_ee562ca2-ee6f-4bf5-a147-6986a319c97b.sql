ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_asunto_length
  CHECK (asunto IS NULL OR char_length(asunto) <= 100);

DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(nombre) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(mensaje) BETWEEN 1 AND 2000
  AND (asunto IS NULL OR char_length(asunto) <= 100)
);