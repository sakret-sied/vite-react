import styles from './Header.module.css';
import SelectUser from '../SelectUser/SelectUser.jsx';

function Header() {
  return (
    <>
      <img className={styles.logo} src="/logo.svg" alt="Logo icon" />
      <SelectUser />
    </>
  );
}

export default Header;
