/**
 * @api {get} /page/{q,limit,page} Read Page
 * @apiVersion 1.0.0
 * @apiName GetPage
 * @apiGroup Page
 * @apiPermission admin
 *
 * @apiDescription Desc
 *
 *   * @apiSuccessExample Page Response
 *     HTTP/1.1 200 OK
*     {
*       "_id": "567d56253826a5d70375c237",
*       "title": "title",
*       "description": "desc",
*       "headline": "head",
*       "content": "content"
*      }
 *
 *
 *
 */


/**
* @api {post} /page/ Create a page
 * @apiVersion 1.0.0
 * @apiName PostPage
 * @apiGroup Page
 * @apiPermission none
 *
 * @apiDescription In this case "apiUse" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} title Title
 * @apiParam {String} descritpion Title
 * @apiParam {String} headline Title
 * @apiParam {String} content Title
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
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /user, but errors not defined again, they were included with "apiUse"
 *
 * @apiParam {String} title Title
 * @apiParam {String} descritpion Title
 * @apiParam {String} headline Title
 * @apiParam {String} content Title
 *
 * 
 */

/* Section */





/**
 * @api {get} /section/{q,limit,page} Read Section
 * @apiVersion 1.0.0
 * @apiName GetSection
 * @apiGroup Section
 * @apiPermission admin
 *
 * @apiDescription Desc
 *
 *   * @apiSuccessExample Page Response
 *     HTTP/1.1 200 OK
*     {
*       "_id": "567d56253826a5d70375c237",
*       "url": "/test/test",
*       "type": "page",
*          { optioonal }
*      }
 */







/* User auth */



/**
 * @api {get} /login/ Api Auth
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













