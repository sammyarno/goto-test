import NavigationBar from "../../components/navigation-bar";
import ContactList from "../../components/contact-list";
import { Container } from "../../components/shared";
import Filter from "../../components/filter";

const App = () => {
  return (
    <Container className="app">
      <NavigationBar />
      <Filter />
      <ContactList />
    </Container>
  );
};

export default App;
