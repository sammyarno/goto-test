import NavigationBar from "../../components/navigation-bar";
import ContactList from "../../components/contact-list";
import { Container } from "../../components/shared";

const App = () => {
  return (
    <Container className="app">
      <NavigationBar />
      <ContactList />
    </Container>
  );
};

export default App;
