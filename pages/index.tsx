import { ThemeProvider } from "styled-components";
import { mainTheme } from "../theme";
import Header from "../components/Header";
import SortingArea from "../components/SortingArea/";
import Head from 'next/head';

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Head>
        <title>Sorting Algorithms Visualizer</title>
      </Head>
      <Header />
      <SortingArea />
    </ThemeProvider>
  );
}

export default App;
