

export async function getPost(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { getPost },
    headers
  } = ctx

  const data = await getPost.getPost()
console.log(data);

  ctx.set("Cache-control", headers["cache-control"]);
  ctx.status = 200;
  ctx.body = {
    message:  data
  };

  await next();


}
