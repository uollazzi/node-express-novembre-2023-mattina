import express, { NextFunction, Request, Response } from "express";

const port = 3000;
const app = express();

app.set("views", "./src/views");
app.set("view engine", "hbs");

// middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("LOG:", req.method, req.url, Date.now());
    // req.body = "Body inserito dal middleware di log";
    // res.setHeader("", "LAB4T Express");
    // next();
    if (req.url == "/pippo")
        res.send("Esater Egg! Trovato il tesoro!");
    else
        next();
});

app.use(express.json());

app.use("/pluto", (req: Request, res: Response, next: NextFunction) => {
    console.log("LOG SPECIALE PLUTO");
    next();
});

app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
    res.render("index", { pageTitle: "Home Page" });
});

app.get("/contatti", (req: Request, res: Response) => {
    res.render("contatti", { pageTitle: "Contatti" });
});

app.get("/chi-siamo", (req: Request, res: Response) => {
    res.render("chi-siamo", { pageTitle: "Chi Siamo" });
});

app.get("/mario", (req: Request, res: Response, next: NextFunction) => {
    const mario = { nome: "Mario", cognome: "Verdi", eta: 45 };
    res.json(mario);
});

app.get("/films/popolari", (req: Request, res: Response) => {
    res.status(200).send("Hai richiesto l'elenco dei films POPOLARI");
});

app.delete("/films/67", (req: Request, res: Response) => {
    res.send("Sviluppatore ubriaco: Pensavi di rimuovere il film 67 sul DB e invece ti torno questa stringa.");
});

app.get("/films/:id", (req: Request, res: Response) => {
    const idFilm = req.params["id"];
    const idFilmNumber = Number(idFilm);

    if (isNaN(idFilmNumber)) {
        res.status(400).send("Errore nella conversione dell'id in numero");
        return;
    }

    res.send("Hai richiesto il film con id:" + idFilm);
});

app.get("/errore", (req: Request, res: Response) => {

    throw new Error("Errore simulato");
});

app.get("/errore-gestito", (req: Request, res: Response) => {
    try {
        throw new Error("Errore simulato nel try catch");
    } catch (error) {
        res.status(500).send("Errore del server nella rotta /errore-gestito");
    }
});

app.post("/register", (req: Request, res: Response) => {
    const password = req.body.password as string;

    if (password.length > 4)
        res.json({ id: 1, email: req.body.email, username: req.body.username });
    else
        res.status(400).json({ message: "Password too short" });
});

app.use((req: Request, res: Response) => {
    res.status(404).send("Pagina non trovata");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).send("Errore del server.");
});

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);

});