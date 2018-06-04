let mysql = require('mysql');
class dbUtil{

}
module.exports = dbUtil;

/**
 * 创建连接池
 * @type {Pool}
 */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1111',
    port: '3306',
    database: 'test',
    connectionLimit : 10,
});

/**
 * 获取连接
 * @returns {Promise<any>}
 */
dbUtil.getConn = function(){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                console.log("数据库连接获取失败");
            } else {
                resolve(conn);
            }
        });
    });
}
/**
 * 不带参数查询
 * @param sql
 * @returns {Promise<any>}
 */
dbUtil.query = async function (sql){
    let conn = await this.getConn();

    let result = await new Promise((resolve,reject)=>{
        conn.query(sql,(err,results,fileds)=>{
            conn.release();
            if(err){
                reject(err);
            }
            resolve(results);
        });
    });
    return result;
};
/**
 * 带参数查询
 * @param sql
 * @param params
 * @returns {Promise<any>}
 */
dbUtil.queryStat = async function (sql,params){
    let conn = await this.getConn();

    let result = await new Promise((resolve,reject)=>{
        conn.query(sql,params,(err,results,fileds)=>{
            if(err){
                reject(err);
            }
            resolve(results);
        });
    });
    return result;
};
/**
 * 更新操作
 * @param sql
 * @param params
 * @returns {Promise<any>}
 */
dbUtil.update = async function(sql,params){
    let conn = await this.getConn();

    let result = await new Promise((resolve,reject)=>{
        conn.query(sql,params,(err,results)=>{
            if(err){
                reject(err);
            }else{
                resolve(results);
                conn.commit();
            }
            conn.release();
        });
    });
    return result;
};
/**
 * 新增操作
 * @param sql
 * @param params
 * @returns {Promise<any>}
 */
dbUtil.insert = async function(sql,params){
    let conn = await this.getConn();
    let paramValues = [],
        temp,
        str = ' VALUES ';
    for(let i = 0, len = params.length; i < len; i++){
        temp = params[i];
        let stri = '(';
        console.log(temp.length);
        for(let j = 0, jlen = temp.length; j < jlen; j++){
            if(j == jlen - 1){
                stri += '?),';
            }else{
                stri += '?,';
            }
            paramValues.push(temp[i]);
        }
        stri = stri.replace(/,$/,'');
        str += stri;
    }
    sql += str;

    console.log(sql);
    let result = await new Promise((resolve,reject)=>{
        conn.query(sql,paramValues,(err,results)=>{
            if(err){
                reject(err);
            }else{
                resolve(results);
                conn.commit();
            }
            conn.release();
        });
    });
    return result;
};
/**
 * 删除操作
 * @param sql
 * @param params
 * @returns {Promise<any>}
 */
dbUtil.delete = async function(sql,params){
    let conn = await this.getConn();
    let result = await new Promise((resolve,reject)=>{
        conn.query(sql,params,(err,results)=>{
            if(err){
                reject(err);
            }else{
                resolve(results);
                conn.commit();
            }
            conn.release();
        });
    });
    return result;
};

