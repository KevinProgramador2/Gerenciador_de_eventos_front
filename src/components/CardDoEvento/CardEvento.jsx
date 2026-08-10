import styles from "./CardEvento.module.css";

export default function CardEvento({ evento, onEditar, onExcluir }) {
  return (
    <div className={styles.card}>
      <img src={evento.imagem} alt={evento.nome} />
      <h3>{evento.nome}</h3>
      <p>{evento.data}</p>
      <p>{evento.localizacao}</p>
      <button onClick={() => onEditar(evento)}>Editar</button>
      <button onClick={() => onExcluir(evento.id)}>Excluir</button>
    </div>
  );
}
