<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018\1\3 0003
 * Time: 16:49
 */

namespace app\lib\exception;




class ParameterException extends BaseException
{
    public $code =400;
    public $msg = '参数错误';
    public $errorCode =10000;
}