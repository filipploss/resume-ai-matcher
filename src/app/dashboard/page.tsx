"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import HomePage from "../page";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        return;
      }

      if (!data.session) {
        router.push("/auth"); // Редирект на страницу авторизации
      } else {
        setUser(data.session.user);
        setLoading(false); // Убираем индикатор загрузки после успешной авторизации
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false); // Убираем индикатор загрузки
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [router]);

  if (loading) return <div>Loading...</div>; // Пока идет проверка сессии

  if (!user) return <div>Please login</div>; // Если пользователь не найден, отображаем сообщение

  return (
    <div>
      <HomePage />
    </div>
  );
}
