<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017\12\21 0021
 * Time: 17:41
 */

namespace app\api\model;


use think\Db;
use think\Exception;

class Banner
{
    public static function getBannerById($id)
    {
        $result = Db::query('select * from banner_item where banner_id = ?',[$id]);
        return $result;
    }
}