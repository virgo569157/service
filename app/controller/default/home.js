'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // const result = await this.app.mysql.get('blog_content', {});
    // console.log('result:', result);
    this.ctx.body = 'api hi';
  }
  async getArticleList() {
    const sql = 'SELECT article.id as id ,' +
                'article.title as title ,' +
                'article.introduce as introduce ,' +
                // 'FROM_UNIXTIME(article.add_time,"%Y-%m-%d %H:%i:%s") as add_time ,' +
                'article.add_time as add_time ,' +
                'article.article_name as article_name ,' +
                'article.view_count as view_count ,' +
                'article.article_content as article_content ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id';
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }
  async getArticleById() {
    const id = this.ctx.params.id;
    // console.log('id:', id);
    const sql = 'SELECT article.id as id ,' +
                'article.title as title ,' +
                'article.introduce as introduce ,' +
                'article.add_time as add_time ,' +
                'article.view_count as view_count ,' +
                'article.article_content as article_content ,' +
                'type.type_name as type_name ,' +
                'type.id as type_id ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'WHERE article.id=' + 1;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };

  }
  // 类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }
  // 根据类别id 获取文章列表
  async getListById() {
    const id = this.ctx.params.id;
    let sql = 'SELECT article.id as id ,' +
    'article.title as title ,' +
    'article.introduce as introduce ,' +
    "FROM_UNIXTIME(article.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time ," +
    'article.view_count as view_count ,' +
    'type.type_name as type_name ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'WHERE type_id='+ id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
