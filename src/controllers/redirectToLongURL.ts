import { UrlService } from "@/services/UrlService";

async function redirectToLongURL(ctx: any) {
  const { url } = ctx.request;
  const param = url.split("/")[1];
  const shortUrlService = new UrlService();
  const ogUrl = await shortUrlService.findOgUrl(param);
  return ctx.redirect(ogUrl);
}

export { redirectToLongURL };
