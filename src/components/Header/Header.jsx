import Logo from '../Logo/Logo.jsx';
import SelectUser from '../SelectUser/SelectUser.jsx';

function Header() {
  return (
    <>
      <Logo image="/logo.svg" />
      <SelectUser />
    </>
  );
}

export default Header;
