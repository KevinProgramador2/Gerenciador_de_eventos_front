import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import CardEvento from "../../components/CardDoEvento/CardEvento";
import Modal from "../../components/Modal/Modal";
import CampoInput from "../../components/CampoInput/CampoInput";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState("");
  const [busca, setBusca] = useState("");
  const [eventoEditando, setEventoEditando] = useState(null);
  const [formEditar, setFormEditar] = useState({
    nome: "",
    data: "",
    localizacao: "",
    imagem: "",
  });
  const [criandoEvento, setCriandoEvento] = useState(false);
  const [formCriar, setFormCriar] = useState({
    nome: "",
    data: "",
    localizacao: "",
    imagem: "",
  });

  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleExcluir(id) {
    const confirmado = confirm("Tem certeza que deseja excluir?");
    if (!confirmado) return;

    api.deleteEvento(id).then(() => {
      setEventos((prev) => prev.filter((e) => e.id !== id));
    });
  }

  function handleEditar(evento) {
    setEventoEditando(evento);
    setFormEditar({
      nome: evento.nome,
      data: evento.data,
      localizacao: evento.localizacao,
      imagem: evento.imagem,
    });
  }

  function handleSalvarEdicao() {
    api.updateEvento(eventoEditando.id, formEditar).then(() => {
      setEventos((prev) =>
        prev.map((e) =>
          e.id === eventoEditando.id
            ? {
                ...e,
                nome: formEditar.nome,
                data: formEditar.data,
                localizacao: formEditar.localizacao,
                imagem: formEditar.imagem,
              }
            : e,
        ),
      );
      setEventoEditando(null);
    });
  }

  function handleCriarEvento() {
    if (!admin?.adminId) return;

    api
      .createEvento({ ...formCriar, adminId: admin.adminId })
      .then((novoEvento) => {
        setEventos((prev) => [...prev, novoEvento]);
        setFormCriar({ nome: "", data: "", localizacao: "", imagem: "" });
        setCriandoEvento(false);
      });
  }

  useEffect(() => {
    if (!admin?.adminId) return;

    api
      .getEventos(admin.adminId)
      .then((data) => setEventos(data))
      .catch((err) => setError(err.message));
  }, [admin?.adminId]);

  const eventosFiltrados = eventos.filter((e) => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return true;
    return [e.nome, e.localizacao, e.data].some((campo) =>
      (campo ?? "").toLowerCase().includes(termo),
    );
  });

  return (
    <main className={styles.containerHome}>
      <header className={styles.headerHome}>
        <h1>Gerenciador de eventos</h1>
        <div className={styles.headerBotoes}>
          <button
            onClick={() => navigate("/cadastro")}
            className={styles.btnCadastro}
          >
            Cadastro
          </button>
          <button
            className={styles.btnAdicionar}
            onClick={() => setCriandoEvento(true)}
          >
            + Adicionar Evento
          </button>
          <button className={styles.btnSair} onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

      <div className={styles.containerBuscar}>
        <section className={styles.buscarEventos}>
          <input
            type="search"
            placeholder="Buscar eventos"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </section>
      </div>
      <section className={styles.containerEventos}>
        {error && <p>{error}</p>}
        {eventosFiltrados.length === 0 ? (
          <p className={styles.semResultados}>
            {busca
              ? "Nenhum evento encontrado para a busca."
              : "Nenhum evento cadastrado ainda."}
          </p>
        ) : (
          eventosFiltrados.map((evento) => (
            <CardEvento
              key={evento.id}
              evento={evento}
              onEditar={handleEditar}
              onExcluir={handleExcluir}
            />
          ))
        )}
      </section>

      {eventoEditando && (
        <Modal titulo="Editar Evento" onFechar={() => setEventoEditando(null)}>
          <CampoInput
            label="Nome do Evento"
            value={formEditar.nome}
            onChange={(e) =>
              setFormEditar((f) => ({ ...f, nome: e.target.value }))
            }
          />

          <CampoInput
            label="Data"
            type="date"
            value={formEditar.data}
            onChange={(e) =>
              setFormEditar((f) => ({ ...f, data: e.target.value }))
            }
          />

          <CampoInput
            label="Localização"
            value={formEditar.localizacao}
            onChange={(e) =>
              setFormEditar((f) => ({ ...f, localizacao: e.target.value }))
            }
          />

          <CampoInput
            label="URL da Imagem"
            placeholder="https://..."
            value={formEditar.imagem}
            onChange={(e) =>
              setFormEditar((f) => ({ ...f, imagem: e.target.value }))
            }
          />

          <div className={styles.modalButtons}>
            <button
              className={styles.btnCancelar}
              onClick={() => setEventoEditando(null)}
            >
              Cancelar
            </button>
            <button className={styles.btnSalvar} onClick={handleSalvarEdicao}>
              Salvar
            </button>
          </div>
        </Modal>
      )}

      {criandoEvento && (
        <Modal titulo="Novo Evento" onFechar={() => setCriandoEvento(false)}>
          <CampoInput
            label="Nome do Evento"
            placeholder="Ex: Show de Rock"
            value={formCriar.nome}
            onChange={(e) =>
              setFormCriar((f) => ({ ...f, nome: e.target.value }))
            }
          />

          <CampoInput
            label="Data"
            type="date"
            value={formCriar.data}
            onChange={(e) =>
              setFormCriar((f) => ({ ...f, data: e.target.value }))
            }
          />

          <CampoInput
            label="Localização"
            placeholder="Ex: São Paulo"
            value={formCriar.localizacao}
            onChange={(e) =>
              setFormCriar((f) => ({ ...f, localizacao: e.target.value }))
            }
          />

          <CampoInput
            label="URL da Imagem"
            placeholder="https://..."
            value={formCriar.imagem}
            onChange={(e) =>
              setFormCriar((f) => ({ ...f, imagem: e.target.value }))
            }
          />

          <div className={styles.modalButtons}>
            <button
              className={styles.btnCancelar}
              onClick={() => setCriandoEvento(false)}
            >
              Cancelar
            </button>
            <button className={styles.btnSalvar} onClick={handleCriarEvento}>
              Salvar
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}
