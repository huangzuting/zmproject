<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017\12\21 0021
 * Time: 14:53
 */

namespace app\api\validate;

use app\lib\exception\BaseException;
use app\lib\exception\ParameterException;
use think\Exception;
use think\Request;
use think\Validate;
class BaseValidate extends Validate
{
    public function goCheck(){
        //获取http传入的参数
        //对参数做校验
        $requst = Request::instance();
        $params = $requst->param();

        $result = $this->check($params);
        if (!$result){
            $e = new ParameterException([
                'msg' => $this->error,
            ]);
            throw $e;
        }else{
            return true;
        }
    }
}