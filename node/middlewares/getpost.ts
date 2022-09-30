export async function getpost(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { getPost },
  } = ctx

  try {
    const materials = await getPost.postRequest()
    ctx.body = materials
  } catch (error) {
    ctx.body = error?.response?.data || error
  }

  await next()
}
