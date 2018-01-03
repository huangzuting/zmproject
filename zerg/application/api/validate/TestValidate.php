<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017\12\19 0019
 * Time: 10:59
 */

namespace app\api\validate;

use think\Validate;
class TestValidate extends Validate
{
    protected $rule = [
        'name' =>'require|max:10',
        'email' =>'email'
    ];
}