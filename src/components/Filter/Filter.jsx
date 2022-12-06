import s from './Filter.module.css';

export default function Filter({ filter, filterInputChange }) {
  return (
    <label className={s.filterLabel}>
      <input
        className={s.filter}
        type="text"
        name={filter}
        onChange={filterInputChange}
        placeholder="Find contacts by name"
      />
    </label>
  );
}
