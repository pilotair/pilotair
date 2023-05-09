import Koa from "koa"

const app = new Koa();
app.use((context) => {
    context.body = "Hello";
})
app.listen(80)