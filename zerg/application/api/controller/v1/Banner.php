<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017\12\19 0019
 * Time: 10:32
 */

namespace app\api\controller\v1;

use app\api\validate\IDMustBePositiveInt;
use app\api\model\Banner as BannerModel;
use app\lib\exception\BannerMissException;
use think\Exception;
use think\Model;

class Banner extends Model
{
    /*
     * @id banner的id号获得指定的banner信息
     * @url /banner/:id
     * @http GET
     * @id banner的id号
     * */
    public function  getBanner($id){

        (new IDMustBePositiveInt())->batch()->goCheck();

        $banner = BannerModel::getBannerById($id);

        if(!$banner){
            throw new BannerMissException();
        }

        return json($banner,200);

    }
}