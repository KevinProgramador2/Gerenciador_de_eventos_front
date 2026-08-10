import { useState } from "react";

export function useForm(estadoInicial) {
  const [form, setForm] = useState(estadoInicial);

  const set = (campo) => (e) =>
    setForm((f) => ({ ...f, [campo]: e.target.value }));

  return { form, setForm, set };
}
