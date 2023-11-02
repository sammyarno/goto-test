import NavigationBar from "../../components/navigation-bar";
import ContactList from "../../components/contact-list";
import { Container } from "../../components/shared";
import Filter from "../../components/filter";
import ContactProvider from "../../contexts/contact";

const App = () => {
  return (
    <Container className="app">
      <NavigationBar />
      <ContactProvider>
        <Filter />
        <ContactList />
      </ContactProvider>
    </Container>
  );
};

export default App;
