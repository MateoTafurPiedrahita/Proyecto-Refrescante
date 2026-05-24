CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  asunto TEXT,
  mensaje TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Cualquier visitante (anónimo) puede enviar un mensaje
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(nombre) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(mensaje) BETWEEN 1 AND 2000
);

-- Nadie puede leer los mensajes desde el cliente (solo desde el backend con service role)
-- No se crean policies SELECT/UPDATE/DELETE intencionalmente