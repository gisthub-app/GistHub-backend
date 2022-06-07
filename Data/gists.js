const gists = [
  {
    owner: "",
    title: "React setup",
    permissions: ["Gaurang"],
    content: [
      { type: "Code", payload: "let myVar = 23", language: "JavaScript" },
      { type: "Text", payload: "numbers in JavaScript", language: "English" },
      { type: "Code", payload: "useEffect(){}", language: "JavaScript" },
      { type: "Text", payload: "React Hook", language: "English" },
    ],
    isPrivate: false,
  },
  {
    owner: "",
    title: "Node setup",

    permissions: ["Gaurang"],
    content: [
      { type: "Code", payload: "[i for i in range(23)]", language: "Python" },
      {
        type: "Text",
        payload: "List comprehension in Python",
        language: "English",
      },
      {
        type: "Code",
        payload: "queue = collections.deque()",
        language: "Python",
      },
      {
        type: "Text",
        payload: "Double ended queue in Python",
        language: "English",
      },
    ],
    isPrivate: false,
  },
  {
    owner: "",
    title: "Flutter setup",
    permissions: ["Gaurang"],
    content: [
      {
        type: "Code",
        payload: "int increment(int x) {  return (x+1); }",
        language: "C++",
      },
      {
        type: "Text",
        payload: "Functors in C++",
        language: "English",
      },
      {
        type: "Code",
        payload: "int data[5] = {0, 1, 2, 3, 4};",
        language: "C++",
      },
      {
        type: "Text",
        payload: "Arrays in C++",
        language: "English",
      },
    ],
    isPrivate: false,
  },
  {
    owner: "629c1ecc1ea311dfc705f806",
    title: "Flutter setup",
    permissions: ["john"],
    content: [
      {
        type: "Code",
        payload: "int increment(int x) {  return (x+1); }",
        language: "C++",
      },
      {
        type: "Text",
        payload: "Functors in C++",
        language: "English",
      },
      {
        type: "Code",
        payload: "int data[5] = {0, 1, 2, 3, 4};",
        language: "C++",
      },
      {
        type: "Text",
        payload: "Arrays in C++",
        language: "English",
      },
    ],
    isPrivate: false,
  },
]

export default gists
