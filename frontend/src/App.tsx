import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Landing from "./pages/Landing";
import Test from "./pages/Test";
import { theme } from "./theme";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import FortuneSelect from "./pages/FortuneSelect";
import ResultDetail from "./pages/ResultDetail";
import TarotProcess from "./pages/TarotProcess";
import BeforeChat from "./pages/BeforeChat";

import CardSelect from "./pages/CardSelect";

import CardSave from "./pages/CardSave";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@1,8..60,300&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, tchead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  background-color:${(props) => props.theme.bgColor};
  color:black;
  line-height: 1.2;
  overflow-x: hidden;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const router = createBrowserRouter([
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/main",
    element: <Main />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/fortuneselect",
    element: <FortuneSelect />,
  },
  {
    path: "/resultdetail",
    element: <ResultDetail />,
  },
  {
    path: "/tarotprocess",
    element: <TarotProcess />,
  },

  {
    path: "/beforechat",
    element: <BeforeChat />,
  },
  {
    path: "/cardselect",
    element: <CardSelect />,
  },
  {
    path: "/cardsave",
    element: <CardSave />,
  },
]);

function App() {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
