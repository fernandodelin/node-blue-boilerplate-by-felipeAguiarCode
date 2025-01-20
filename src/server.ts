import fastify from "fastify";
import cors from "fastify-cors";


const server = fastify({ logger: true });


server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
});


const teams = [
    { id: 1, name: "Ferrari" },
    { id: 2, name: "McLaren" },
    { id: 3, name: "Renault" }
];

const drivers = [
    { id: 1, name: "Lewis Hamilton" },
    { id: 2, name: "Lando Norris" },
    { id: 3, name: "Fernando Alonso" }
];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  
  return { teams }
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  
  return { drivers }
});

interface DriversParams {
    id: string;
}


server.get<{Params: DriversParams}>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find( drive => drive.id === id);
    if (!driver) {
        response.type("application/json").code(404);
        return { message: "driver not found" };
   } else{
        response.type("application/json").code(200);
        return { driver };
    }
});



server.listen({port:3333}, () => {
    console.log("Server is running on port 3333 http://localhost:3333");
});