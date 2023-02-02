import { Header } from "components";
import React from "react";
import Select from "react-select";
// function Select({ options }: { options: unknown[] }) {
//   return (
//     <>
//       {options.map((o: string) => (
//         <>{JSON.stringify(o)}</>
//       ))}
//     </>
//   );
// }

export function App() {
  return (
    <div className="App">
      <Header />
      <Select options={[]} />
    </div>
  );
}

export default App;
