type HelloWorld = {
    name: "test/hello.world";
    data: {
      email: string;
    };
  };
  
  type Events = {
    "test/hello.world": HelloWorld;
  };