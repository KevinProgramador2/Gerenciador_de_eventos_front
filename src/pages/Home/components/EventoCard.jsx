import { formatDate, normalizarImagem } from "../../../services/api";
import styles from "./EventoCard.module.css";

export default function EventoCard({ evento, onEditar, onExcluir }) {
  const imagem = normalizarImagem(evento.imagem);

  return (
    <article className={styles.cartao}>
      {imagem ? (
        <img className={styles.imagem} src={imagem} alt={evento.nome} />
      ) : (
        <div className={styles.imagemVazia}>Sem imagem</div>
      )}

      <div className={styles.corpo}>
        <h2 className={styles.nome}>{evento.nome}</h2>
        <p className={styles.data}>Data: {formatDate(evento.data)}</p>
        <p className={styles.local}>Local: {evento.localizacao}</p>

        <div className={styles.botoes}>
          <button className={styles.botaoEditar} onClick={onEditar}>
            Editar
          </button>
          <button className={styles.botaoExcluir} onClick={onExcluir}>
            Excluir
          </button>
        </div>
      </div>
    </article>
  );
}
