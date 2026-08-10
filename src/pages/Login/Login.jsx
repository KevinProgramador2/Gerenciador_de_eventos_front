import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { session } from "../../services/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../components/Toast/Toast";
import styles from "./Login.module.css";
import Button from "../../components/Button";
import { useForm } from "../../hooks/useForm";

export default function Login() {
  const navigate = useNavigate();
  const { show } = useToast();
  const { login } = useAuth();

  const salvo = session.getCredentials();
  const { form, setForm, set } = useForm({
    email: salvo?.email ?? "",
    senha: salvo?.senha ?? "",
    lembrar: Boolean(salvo),
  });

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!form.email.trim() || !form.senha) {
      setErro("Informe o email e a senha.");
      return;
    }
    setLoading(true);
    try {
      const data = await api.login(form.email.trim(), form.senha);
      login(data);
      if (form.lembrar) {
        session.saveCredentials({
          email: form.email.trim(),
          senha: form.senha,
        });
      } else {
        session.clearCredentials();
      }
      show(`Bem-vindo(a), ${data.nome}!`);
      navigate("/home", { replace: true });
    } catch (err) {
      setErro(err.message);
      setLoading(false);
    }
  };

  return (
    <main className={styles.containerLogin}>
      <div className={styles.formularioLogin}>
        <form onSubmit={handleSubmit} noValidate>
          <h1 className={styles.tituloLogin}>Entrar</h1>
          <p className={styles.pSubtitle}>Acesse sua conta de administrador</p>
          <label className={styles.campoEmail}>
            <span className={styles.campoLabel}>Email do Administrador</span>
            <input
              type="email"
              className={styles.input}
              placeholder="admin@email.com"
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
            />
          </label>

          <label className={styles.campo}>
            <span className={styles.campoSenha}>Senha</span>
            <input
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={form.senha}
              onChange={set("senha")}
              autoComplete="current-password"
            />
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={form.lembrar}
              onChange={(e) =>
                setForm((f) => ({ ...f, lembrar: e.target.checked }))
              }
            />
            <span className={styles.checkboxBox} aria-hidden="true">
              &#10003;
            </span>
            <span>Gravar senha para acesso rápido</span>
          </label>

          {erro && (
            <p className={`${styles.alert} ${styles.alertError}`}>{erro}</p>
          )}

          <Button type="submit" className={styles.btnLogin} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <p className={styles.pCadastro}>
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro" className={styles.pCadastrado}>
              Cadastrar-se
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
