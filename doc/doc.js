/**
 * @api {get} /page{/search}?q={query}{&page,per_page} View Page
 * @apiVersion 1.0.0
 * @apiName GetPage
 * @apiGroup Page
 * @apiPermission none
 *
 * @apiDescription Desc
 *
 *@apiSuccessExample Page Response
 *HTTP/1.1 200 OK
 *[
 *  {
 *    "_id": "56ee8f670006866e2462a41c",
 *    "title": "Lorem asdsda asdsad",
 *    "type": "page",
 *    "description": "adsd as adsadssad",
 *    "raw_content":"<h1>raw</h1>",
 *    "md_content": "# raw",
 *    "url":"/raw",
 *    "image": "",
 *    "created_at": "2016-03-20T11:54:15.106Z",
 *    "page_url": "http://localhost:8090/api/page/56ee8f670006866e2462a41c"
 *  }
 *]
 *
 * *@apiSuccessExample Page Not Found Response
 *HTTP/1.1 404 Not Found
 *{
 *  error: "Requested resource doesn't exist"
 *}
 *
 */


/**
* @api {post} /page/ Create a page
 * @apiVersion 1.0.0
 * @apiName PostPage
 * @apiGroup Page
 * @apiPermission admin
 *
 * @apiDescription Create a page
 * 
 *
 * @apiParam {String} url url
 * @apiParam {String} type type
 * @apiParam {String} title Title
 * @apiParam {String} descritpion Description
 * @apiParam {String} headline Headline
 * @apiParam {String} md_content Markdown content
 * @apiParam {String} raw_content Html content
 *
 * @apiParam {String} perex Perex
 * @apiParam {String} author Author
 * @apiParam {Array} tags Tags
 * 
 * @apiParam {String} image Image
 * @apiParam {String} visible=1 TVisible
 *
  * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * 
 */


/**
 * @api {put} /page/:id Change Page
 * @apiVersion 1.0.0
 * @apiName PutPage
 * @apiGroup Page
 * @apiPermission admin
 *
 * @apiDescription This function has same errors like POST /user, but errors not defined again, they were included with "apiUse"
 *
 * @apiParam {String} url url
 * @apiParam {String} type type
 * @apiParam {String} title Title
 * @apiParam {String} descritpion Description
 * @apiParam {String} headline Headline
 * @apiParam {String} md_content Markdown content
 * @apiParam {String} raw_content Html content
 *
 * @apiParam {String} perex Perex
 * @apiParam {String} author Author
 * @apiParam {Array} tags Tags
 * 
 * @apiParam {String} image Image
 * @apiParam {String} visible=1 TVisible
 * 
 */

/**
 * @api {delete} /page/{id} Delete Page
 * @apiVersion 1.0.0
 * @apiName RemovePage
 * @apiGroup Page
 * @apiPermission admin
 *
 * @apiDescription Desc
 *
 *   @apiSuccessExample Page Response
 *     HTTP/1.1 200 OK
 *{
 *  status: "Resource removed successfully"
 *}
 *
 *
 *
 */




/* User auth */



/**
 * @api {post} /login/ Api Auth
 * @apiVersion 1.0.0
 * @apiName GetLogin
 * @apiGroup Login
 * @apiPermission admin
 *
 * @apiDescription Desc
 *
  * @apiParam {String} mail Mail
 * @apiParam {String} pass Pass
 *
 *    @apiSuccessExample Auth Response Authorized
 *     HTTP/1.1 200 OK
 *      {
 *         status: 200,
 *         message: "Authorized",
 *         apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTZkc2ZzZmRkZGRkZGRkNzg5MCIsIm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.9Bm7UCSB78F-wiphRyFKjaYPx2aBpRjK8fyL_nD93tU",
 *         userid: "bGciOiJIUzI1NiIsInR5cCI6a"
 *      }
 *
 *    @apiSuccessExample Auth Response Unauthorized
 *     HTTP/1.1 200 OK
 *      {
 *        status: 401,
 *         message: "Unauthorized"
 *      }
 *
 */



/**
 * @api {get} /verify/:token Verify Token
 * @apiVersion 1.0.0
 * @apiName GetVerify
 * @apiGroup Login
 * @apiPermission admin
 *
 * @apiDescription Desc
 *
 *    @apiSuccessExample Auth Response Verify
 *     HTTP/1.1 200 OK
 *      {
 *         status: 200,
 *         message: "Authorized"
 *      }
 *
 *    @apiSuccessExample Auth Response Unauthorized
 *     HTTP/1.1 200 OK
 *      {
 *        status: 401,
 *         message: "Unauthorized"
 *      }
 *
 */













