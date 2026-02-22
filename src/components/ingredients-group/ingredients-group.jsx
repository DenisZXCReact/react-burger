import styles from './ingredients-group.module.css';
export default function IngredientsGroup({ title, children, type, titleRef }) {
  return (
    <div id={`group-${type}`}>
      <h2
        className="text text_type_main-medium mb-6"
        ref={(el) => {
          if (el) titleRef.current[type] = el;
        }}
      >
        {title}
      </h2>
      <div className={`${styles.group} pl-4 pr-2`}>{children}</div>
    </div>
  );
}
