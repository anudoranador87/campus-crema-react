import { Accordion } from '@rewind-ui/core';

function App() {
  return (
    <Accordion defaultItem="item-1" activeColor="red" shadow="base" shadowColor="gray" size="lg">
      <Accordion.Item anchor="item-1">
        <Accordion.Header>Header</Accordion.Header>
        <Accordion.Body>Body</Accordion.Body>
      </Accordion.Item>

      <Accordion.Item anchor="item-2">
        <Accordion.Header>Header</Accordion.Header>
        <Accordion.Body>Body</Accordion.Body>
      </Accordion.Item>

      <Accordion.Item anchor="item-3">
        <Accordion.Header>Header</Accordion.Header>
        <Accordion.Body>Body</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default App;