# habits

CREATE POLICY "Enable insert for users based on user_id" ON public.habits FOR INSERT
WITH
CHECK (auth.uid () = "createdByUserFK");

CREATE POLICY "Allow users to delete their own records." ON public.habits FOR DELETE USING ("createdByUserFK" = auth.uid ());

# todos

CREATE POLICY "Enable delete for users based on user_id"
ON "public"."todos"
TO public
USING ( (auth.uid() = "createdByUserFK") );

# HabitDoLog
