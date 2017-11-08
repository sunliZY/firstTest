<?php
/**
 * Author :chencheng
 * CreateTime : 2017-06-12
 * Description: 芝麻积分
 */
class sesame{
	//芝麻信用网关地址
	public $gatewayUrl = 'https://zmopenapi.zmxy.com.cn/openapi.do';
	//商户私钥文件
	public $privateKeyFile = '/app/credit_wechat/modules/phpscript/zhima_ssl/rsa_private_key.pem';
	//芝麻公钥文件
	public $zmPublicKeyFile = '/app/credit_wechat/modules/phpscript/zhima_ssl/zm_public_web_key.pem';
	//数据编码格式
	public $charset = 'UTF-8';
	//芝麻分配给商户的appId
	public $appId = '1003306';

	public function __construct(){
		include('zmxy-sdk/zmop/ZmopClient.php');
		//授权页
		include('zmxy-sdk/zmop/request/ZhimaAuthInfoAuthorizeRequest.php');
		include('zmxy-sdk/zmop/request/ZhimaCreditScoreGetRequest.php');
	}

	/**
	 * 授权地址
	 * @param  string $name   姓名
	 * @param  string $idcard 身份证
	 * @return string 授权地址
	 */
	public function _init($name, $idcard){
	    $client = new ZmopClient($this->gatewayUrl,$this->appId,$this->charset,$this->privateKeyFile,$this->zmPublicKeyFile);
	    $request = new ZhimaAuthInfoAuthorizeRequest();
	    $request->setChannel("apppc");
	    $request->setPlatform("zmop");
	    $request->setIdentityType("2");// 必要参数 
	    $request->setIdentityParam("{\"name\":\"$name\",\"certType\":\"IDENTITY_CARD\",\"certNo\":\"$idcard\"}");// 必要参数 
	    $request->setBizParams("{\"auth_code\":\"M_H5\",\"channelType\":\"app\",\"state\":\"商户自定义\"}");// 
	    $url = $client->generatePageRedirectInvokeUrl($request);
	     
	    return $url;
	}

	/**
	 * 获取授权信息
	 * @param  string $params 参值
	 * @param  string $sign   签名
	 * @return array  $result
	 */
	public function zhimaAuthInfo($params, $sign){
		$params = strstr ( $params, '%' ) ? urldecode ( $params ) : $params;
	    $sign = strstr ( $sign, '%' ) ? urldecode ( $sign ) : $sign;
	    $client = new \ZmopClient ( $this->gatewayUrl, $this->appId, $this->charset, $this->privateKeyFile, $this->zmPublicKeyFile );
	    $result = $client->decryptAndVerifySign ( $params, $sign );
	    
	    return $result;
	}

	/**
	 * 获取芝麻积分
	 * @param string $openId      芝麻标识
	 * @param int/string $userId  用户ID
	 * @param string $ProductCode 产品代号
	 * @return array $result
	 */
	public function ZhimaCreditScoreGet($openId, $userId, $ProductCode = 'w1010100100000000002'){
		$client = new \ZmopClient($this->gatewayUrl,$this->appId,$this->charset,$this->privateKeyFile,$this->zmPublicKeyFile);
	    $request = new \ZhimaCreditScoreGetRequest();
	    $request->setChannel("apppc");
	    $request->setPlatform("zmop");
	    $TransactionId = date('YmdHiZ', time()) . str_pad($userId, 13, '0', STR_PAD_LEFT);
	    $request->setTransactionId($TransactionId);// 必要参数 
	    $request->setProductCode($ProductCode);// 必要参数 
	    $request->setOpenId($openId);// 必要参数 
	    $response = $client->execute($request);
	    return $response;
	}
}