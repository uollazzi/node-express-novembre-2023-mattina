import express, { NextFunction, Request, Response } from "express";

const port = 3000;
const app = express();

// middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("LOG:", req.method, req.url, Date.now());
    // req.body = "Body inserito dal middleware di log";
    // res.setHeader("", "LAB4T Express");
    next();
})

app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
    res.send("Ciao!");
});

app.get("/mario", (req: Request, res: Response) => {
    const mario = { nome: "Mario", cognome: "Verdi", eta: 45 };
    res.json(mario);
});

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});