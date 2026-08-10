import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useForm } from "../../hooks/useForm";
import { useToast } from "../../components/Toast/Toast";
import styles from "./Cadastro.module.css";
import Button from "../../components/Button";
import CampoInput from "../../components/CampoInput/CampoInput";

export default function Cadastro() {
  const navigate = useNavigate();
  const { show } = useToast();

  const { form, set } = useForm({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (
      !form.nome.trim() ||
      !form.email.trim() ||
      !form.senha ||
      !form.confirmarSenha
    ) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await api.registerAdmin({
        nome: form.nome.trim(),
        email: form.email.trim(),
        confirmarSenha: form.confirmarSenha,
        senha: form.senha,
      });
      show("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      setErro(err.message);
      setLoading(false);
    }
  };

  return (
    <main className={styles.containerCadastro}>
      <div className={styles.formularioCadastro}>
        <form onSubmit={handleSubmit} noValidate>
          <h1 className={styles.tituloCadastro}>Cadastrar</h1>
          <p className={styles.pSubtitle}>Crie sua conta de administrador</p>

          <CampoInput
            label="Nome do Administrador"
            placeholder="Seu nome"
            value={form.nome}
            onChange={set("nome")}
          />

          <CampoInput
            label="Email"
            type="email"
            placeholder="admin@email.com"
            value={form.email}
            onChange={set("email")}
          />

          <CampoInput
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={form.senha}
            onChange={set("senha")}
          />

          <CampoInput
            label="Confirmar Senha"
            type="password"
            placeholder="••••••••"
            value={form.confirmarSenha}
            onChange={set("confirmarSenha")}
          />

          {erro && (
            <p className={`${styles.alert} ${styles.alertError}`}>{erro}</p>
          )}

          <Button
            type="submit"
            className={styles.btnCadastro}
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <p className={styles.pLogin}>
            Já tem uma conta?{" "}
            <Link to="/login" className={styles.pLoginLink}>
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
