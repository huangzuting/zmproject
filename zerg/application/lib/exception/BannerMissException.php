<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018\1\3 0003
 * Time: 10:21
 */

namespace app\lib\exception;


class BannerMissException extends BaseException

{
    public  $code=404;
    public $msg = '请求banner不存在';
    public $errorCode = 40000;
}