<template>
  <view v-if="getPrivacyAgreementPopupShow" class="myPopupBox">
    <view class="container">
      <view class="mainContent" v-html="contentText"></view>
      <view class="closeBtn themeBtn" @click="closeHandler">关闭</view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "PrivacyAgreement",
  data() {
    return {
      contentText: `
        <h3>提示条款</h3>
        您的信任对我们非常重要，我们深知个人信息对您的重要性，我们将按法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。鉴此，广州万有通告信息科技有限公司（或简称“我们”）制定本隐私权政策并提醒您：<br>
        本隐私权政策适用于万有通告中的产品或服务。<br>
        需要特别说明的是，<strong>本隐私权政策不适用于其他第三方向您提供的产品或服务，也不适用于万有通告中已另行独立设置法律声明及隐私权政策的产品或服务。<br>
        在使用万有通告各项产品或服务前，请您务必仔细阅读并透彻理解本隐私权政策，在确认充分理解并同意后使用相关产品或服务。一旦您开始使用万有通告各项产品或服务，即表示您已充分理解并同意本政策。如对本政策内容有任何疑问、意见或建议，您可通过本协议提供的联系方式与我们联系。</strong><br>

        <h3>第一部分 定义</h3>
        万有通告：指万有通告网站及万有通告客户端。<br>
        万有通告服务提供者：指广州万有通告信息科技有限公司。<br>
        <strong>个人信息：指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。例如姓名、电子邮件地址、电话号码、银行卡号、身份证号码、住址、通讯记录等信息，或我们可以正当地通过链接找到此类信息的其他数据。<br>
        个人敏感信息：包括身份证件号码、手机号码、个人生物识别信息、支付宝账号、账户信息、行踪轨迹、交易信息、14岁以下（含）儿童的个人信息等。<br>
        个人信息删除：指在实现日常业务功能所涉及的系统中去除个人信息的行为，使其保持不可被检索、访问的状态。</strong><br>
        Cookie：Cookie是包含字符串的小文件，会在您访问网站时发送到您的计算机上。当您再次访问网站时，Cookie使该网站可以识别您的浏览器。Cookie还能存储用户使用偏好及其他信息。您可以重置您的浏览器拒绝所有的Cookie,或者在发送Cookie时提示。但如果没有Cookie，某些网站功能或服务可能无法正常工作。<br>
        应用数据缓存：应用数据缓存是指设备上的一种数据存储机制。使用它有很多好处，例如，可让网络应用在未连接互联网的情况下运行，以及可通过提高内容加载速度来改善相关应用的性能。<br>
        IP地址：每台连接到互联网的计算机都指定了唯一的编号，称为互联网协议（IP）地址。由于这些编号通常都是根据国家/地区的区域指定的，因此IP地址通常可用于识别计算机连接至互联网时所在的国家/地区。<br>

        <h3>第二部分 法律声明</h3>
        <strong>权利归属</strong><br>
        除非我们另行声明，万有通告的所有产品、技术、软件、程序、数据及其他信息（包括文字、图标、图片、照片、音频、视频、图表、色彩组合、版面设计等）的所有权利（包括版权、商标权、专利权、商业秘密及其他相关权利）均归万有通告服务提供者所有。未经万有通告服务提供者许可，任何人不得以包括通过机器人、蜘蛛等程序或设备监视、复制、传播、展示、镜像、上载、下载等方式擅自使用万有通告内的任何内容。万有通告等文字及/或标识，以及其他标识、徽记、产品和服务名称均为万有通告服务提供者在中国的商标，如有宣传、展示等任何使用需要，您必须取得万有通告服务提供者事先书面授权。<br>
        <strong>责任限制</strong><br>
        鉴于万有通告提供的信息发布服务属于电子公告牌性质，万有通告上的信息（包括但不限于店铺名称、产品的描述和说明、相关图片、视频等）由用户自行提供并上传，由用户对其提供并上传的信息承担相应法律责任。万有通告服务提供者对此另有约定的，将在相关的协议或其他法律文本中与您进行明确。<br>
        <strong>知识产权保护</strong><br>
        我们尊重知识产权，反对并打击侵犯知识产权的行为。知识产权权利人若认为万有通告内容（包括但不限于万有通告用户发布的信息）侵犯其合法权益的，可以通过万有通告APP专属客服进行投诉，我们将在收到知识产权权利人合格通知后依据相应的法律法规以及平台规则及时处理。<br>

        <h3>第三部分 隐私权政策</h3>
        本隐私权政策部分将帮助您了解以下内容：<br>
        一、我们如何收集和使用您的个人信息<br>
        二、我们如何使用Cookie和同类技术<br>
        三、我们如何共享、转让、公开披露您的个人信息<br>
        四、我们如何保护您的个人信息<br>
        五、您如何管理您的个人信息<br>
        六、我们如何处理未成年人的个人信息<br>
        七、您的个人信息如何在全球范围转移<br>
        八、本隐私权政策如何更新<br>
        九、如何联系我们<br>

        <h3>一、我们如何收集和使用您的信息</h3>
        我们会出于本隐私权政策所述的以下目的，收集和使用您的个人信息：<br>
        （一）为您展示和推送商品或服务<br>
        为改善我们的产品或服务、向您提供个性化的服务，我们会根据您的浏览及搜索记录、设备信息、位置信息、订单信息，提取您的浏览、搜索偏好、行为习惯、位置信息的特征，基于特征标签进行间接人群画像并展示、推送信息和可能的商业广告。<br>
        如果您不想接受我们给您发送的商业广告，您可通过短信提示回复退订或我们提供的其他方式进行退订或关闭。在您使用我们提供的站内搜索服务时，我们也同时提供了不针对您个人特征的选项。<br>
        （二）向您提供产品或服务<br>
        1、您向我们提供的信息<br>
        为实现向您提供我们产品或服务的基本功能，您应授权我们收集、使用的必要的信息。您可能需要提供联系邮箱、联系电话、微信账号、支付宝账号并选择付款方式等。如果我们委托第三方向您提供服务时，我们会在征得您同意后将上述信息共享给第三方。如果您拒绝提供此类信息，您可能将无法充分的使用我们的产品或服务。<br>
        为实现向您提供我们产品及/或服务的附加功能，您可选择授权我们收集、使用的信息。如您拒绝提供，您将无法正常使用相关附加功能或无法达到我们拟达到的功能效果，但并不会影响您正常使用我们产品或服务的基本功能。<br>
        2、我们在您使用产品或服务过程中收集的信息<br>
        为向您提供更契合您需求的页面展示和搜索结果、了解产品适配性、识别账号异常状态，我们会收集关于您使用的产品或服务以及使用方式的信息并将这些信息进行关联，这些信息包括：<br>
        设备信息：我们会根据您在软件安装及使用中授予的具体权限，接收并记录您所使用的设备相关信息（包括但不限于设备型号、操作系统版本、设备设置、唯一设备标识符的软硬件特征信息）、设备所在位置相关信息（包括但不限于IP地址、GPS位置以及能够提供相关信息的Wi-Fi接入点、蓝牙和基站的传感器信息）。<br>
        日志信息：当您使用万有通告的产品或服务时，我们会自动收集您对我们产品或服务的详细使用情况，作为有关网络日志保存。包括您的搜索查询内容、IP地址、浏览器的类型、电信运营商、使用的语言、访问日期和时间及您访问的网页记录。<br>
        相册信息：当用户需要将商品图片保存到本地时，需要用户授权，访问用户的相册，将图片保存到本地。<br>
        定位信息：我们会在您开启位置权限后访问获取您的位置信息，根据您的位置信息为您提供更契合您需求的页面展示、产品及/或服务，比如向您推荐附近的优惠信息。<br>
        我们在此特别提醒您：<br>
        (1)我们致力于打造多样的产品和服务以满足您的需求。因我们向您提供的产品和服务种类众多，且不同用户选择使用的具体产品/服务范围存在差异，相应的，基本或附加功能及收集使用的个人信息类型、范围等会有所区别，请以具体的产品或服务功能为准；<br>
        (2)您通过万有通告跳转至各大购物平台购买您所选定的商品或服务时，您向第三方购物平台提供的个人信息将受您与购物平台订立的用户协议或隐私协议所约束和保护。但为向您提供购物优惠或津贴，您应同意我们收集您在购物平台的订单信息以及支付信息。<br>
        (3)单独的设备信息、日志信息等是无法识别特定自然人身份的信息。如果我们将这类非个人信息与其他信息结合用于识别特定自然人身份，或者将其与个人信息结合使用，则在结合使用期间，这类非个人信息将被视为个人信息，除取得您授权或法律法规另有规定外，我们会将该类个人信息做匿名化、去标识化处理；<br>
        (4)若我们从第三方处间接获取您的信息的，我们会在收集前要求该第三方说明其个人信息来源，以及是否已经就其收集、处理以及向我们提供您的个人信息取得了您的合法授权。除法律明确允许的情形外，我们只会在确认第三方已经取得您的授权同意后再从第三方收集您的个人信息，如果第三方的授权范围无法涵盖我们的处理和使用目的时，我们会自行或者要求该第三方征得您的同意后再行处理您的个人信息。同时，我们的专业安全团队对个人信息会进行安全加固（包括敏感信息报备、敏感信息加密存储、访问权限控制等）。我们会使用不低于我们对资深用户个人信息同等的保护手段与措施对间接获取的个人信息进行保护。同时，我们收集的有关您的信息和资料将保存在万有通告及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或我们收集信息和资料所在地的境外并在境外被访问、存储和展示。<br>
        为提高您使用我们及合作伙伴提供服务的安全性，保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或万有通告相关协议规则的情况，我们可能使用或整合您的会员信息、交易信息、设备信息、有关网络日志以及我们、合作伙伴取得您授权或依据法律共享的信息，来综合判断您账户及交易风险、进行身份验证、检测及防范安全事件，并依法采取必要的记录、审计、分析、处置措施。<br>
        （四）纳税认证<br>
        为便于向税务部门纳税，在您提现时，我们会在征得您同意后收集您的身份信息，您的身份信息将用于纳税认证。如果您拒绝提供身份信息，我们将无法向您提供相关提现服务。<br>
        （五）其他用途<br>
        我们将信息用于本隐私权政策未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。<br>
        （六）征得授权同意的例外<br>
        根据相关法律法规规定，以下情形中收集您的个人信息无需征得您的授权同意：<br>
        1、与国家安全、国防安全相关的；<br>
        2、与公共安全、公共卫生、重大公共利益有关的；<br>
        3、与犯罪侦查、起诉、审判和判决执行等有关的；<br>
        4、出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到您本人同意的；<br>
        5、所收集的个人信息是您自行向社会公众公开的；<br>
        6、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；<br>
        7、根据您的要求签订合同所必需的；<br>
        8、用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；<br>
        9、为合法的新闻报道所必需的；<br>
        10、学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；<br>
        11、法律法规规定的其他情形。<br>
        如我们停止运营万有通告产品或服务，我们将及时停止继续收集您个人信息的活动，将停止运营的通知以逐一送达或公告的形式通知您，我们并将根据适用法律法规的要求对所持有的个人信息进行删除或匿名化处理。<br>

        <h3>二、我们如何使用Cookie</h3>
        为确保网站正常运转、为您获得更轻松的访问体验、向您推荐您可能感兴趣的内容，我们会在您的计算机或移动设备上存储名为Cookie的小数据文件。Cookie通常包含标识符、站点名称以及一些号码和字符。借助于Cookie，网站能够存储您的账户信息、商品记录、订单记录、偏好商品等数据。<br>
        若您不同意我们在您的计算机或移动设备上存储Cookie的小数据文件，您可卸载万有通告不再使用。<br>

        <h3>三、我们如何共享、转让、公开披露您的个人信息</h3>
        （一）共享<br>
        我们不会与万有通告服务提供者以外的公司、组织和个人共享您的个人信息，但以下情况除外：<br>
        1、在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。<br>
        2、在法定情形下的共享：我们可能会根据法律法规规定、诉讼争议解决需要，或按行政、司法机关依法提出的要求，对外共享您的个人信息。<br>
        3、与授权合作伙伴共享：仅为实现本隐私权政策中声明的目的，我们的某些服务将由我们和授权合作伙伴共同提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。我们的合作伙伴无权将共享的个人信息用于与产品或服务无关的其他用途。<br>
        目前，我们的授权合作伙伴包括以下类型：<br>
        （1）广告、分析服务类的授权合作伙伴。除非得到您的许可，否则我们不会将您的个人身份信息（指可以识别您身份的信息，例如姓名或电子邮箱，通过这些信息可以联系到您或识别您的身份）与提供广告、分析服务的合作伙伴共享。我们会向这些合作伙伴提供有关其广告覆盖面和有效性的信息，而不会提供您的个人身份信息，或者我们将这些信息进行汇总，以便它不会识别您个人。例如，只有在广告主同意遵守我们的广告发布准则后，我们才可能会告诉广告主他们广告的效果如何，或者有多少人看了他们广告或在看到广告后安装了应用，或者向这些合作伙伴提供不能识别个人身份的统计信息，帮助他们了解其受众或顾客。<br>
        （2）供应商、服务提供商和其他合作伙伴。我们将信息发送给支持我们业务的供应商、服务提供商和其他合作伙伴，这些支持包括提供技术基础设施服务、分析我们服务的使用方式、衡量广告和服务的有效性、提供客户服务、支付便利或进行学术研究和调查。<br>
        对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的数据保护协议，要求他们按照我们的说明、本隐私权政策以及其他任何相关的保密和安全措施来处理个人信息。<br>
        （二）转让<br>
        我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：<br>
        1、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；<br>
        2、在万有通告服务提供者发生合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本隐私权政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。<br>
        （三）公开披露<br>
        我们仅会在以下情况下，公开披露您的个人信息:<br>
        1、获得您明确同意或基于您的主动选择，我们可能会公开披露您的个人信息；<br>
        2、如果我们确定您出现违反法律法规或严重违反万有通告相关协议规则的情况，或为保护万有通告及其关联公司用户或公众的人身财产安全免遭侵害，我们可能依据法律法规或万有通告相关协议规则披露关于您的个人信息，包括相关违规行为以及万有通告已对您采取的措施。<br>
        （四）共享、转让、公开披露个人信息时事先征得授权同意的例外<br>
        以下情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：<br>
        1、与国家安全、国防安全有关的；<br>
        2、与公共安全、公共卫生、重大公共利益有关的；<br>
        3、与犯罪侦查、起诉、审判和判决执行等有关的；<br>
        4、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；<br>
        5、您自行向社会公众公开的个人信息；<br>
        6、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。<br>
        根据法律规定，共享、转让经去标识化处理的个人信息，且确保数据接收方无法复原并重新识别个人信息主体的，不属于个人信息的对外共享、转让及公开披露行为，对此类数据的保存及处理将无需另行向您通知并征得您的同意。<br>

        <h3>四、我们如何保护您的个人信息安全</h3>
        （一）我们已采取符合业界标准、合理可行的安全防护措施保护您提供的个人信息安全，防止个人信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会使用加密技术提高个人信息的安全性；我们会使用受信赖的保护机制防止个人信息遭到恶意攻击；我们会部署访问控制机制，尽力确保只有授权人员才可访问个人信息；以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。<br>
        （二）我们以数据为核心，围绕数据生命周期进行的数据安全管理体系，从组织建设、制度设计、人员管理、产品技术等方面多维度提升整个系统的安全性。
        （三）我们会采取合理可行的措施，尽力避免收集无关的个人信息。我们只会在达成本隐私权政策所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。另外，若您需要隐藏订单信息的，可以通过“设置”栏目中的隐私设置，设置隐藏我的订单。<br>
        （四）互联网并非绝对安全的环境，如您发现自己的个人信息尤其是您的账户或密码发生泄露，请您立即联络万有通告专属客服，以便我们根据您的申请采取相应措施。<br>
        请注意，您在使用我们服务时自愿共享甚至公开分享的信息，可能会涉及您或他人的个人信息甚至个人敏感信息。请您更加谨慎地考虑，是否在使用我们的服务时共享甚至公开分享相关信息。<br>
        我们将尽力保障您发送给我们的任何信息的安全性。尽最大能力避免我们的物理、技术或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改或毁坏。<br>
        （五）在不幸发生个人信息安全事件后，我们将按照法律法规的要求向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。事件相关情况我们将以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，上报个人信息安全事件的处置情况。<br>

        <h3>五、您如何管理您的个人信息</h3>
        您可以通过以下方式访问及管理您的个人信息：<br>
        （一）访问您的个人信息<br>
        您有权访问您的个人信息，法律法规规定的例外情况除外。具体访问路径以万有通告相应产品或服务内提供的为准。<br>
        （二）更正或补充您的个人信息<br>
        当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正或补充。<br>
        （三）删除您的个人信息或用户账户注销<br>
        在以下情形中，您可以向我们提出删除个人信息或用户账户注销的请求：申请注销账号<br>
        1、如果我们处理个人信息的行为违反法律法规；<br>
        2、如果我们处理个人信息的行为严重违反了与您的约定；<br>
        3、如果我们永久不再为您提供产品或服务；<br>
        若我们决定响应您的删除或注销请求，我们还将同时尽可能通知从我们处获得您的个人信息的主体，要求其及时删除，除非法律法规另有规定，或这些主体获得您的独立授权。<br>
        当您从我们的服务中删除信息后，我们可能不会立即从备份系统中删除相应的信息，但会在备份更新时删除这些信息。<br>
        （四）撤回已同意的授权<br>
        当您发现我们处理的关于您的授权有错误时，您有权做出撤回已同意的授权或要求我们做出更正。<br>
        （五）响应您的有关请求<br>
        为保障安全，在您向专属客服提出某项合法或符合双方约定的事项时（包括访问您的个人信息、更正或补充您的个人信息、删除您的个人信息、用户账户注销、撤回已同意的授权），您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。<br>
        我们将在15个工作日内做出答复。如您不满意，还可以通过万有通告专属客服发起投诉。<br>
        对于您合法合理且符合双方约定的请求，我们原则上不收取费用，但对多次重复、超出合法合理限度的请求，我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际的请求，我们可能会予以拒绝。<br>
        在以下情形中，按照法律法规要求，我们将无法响应您的请求：<br>
        1、与国家安全、国防安全有关的；<br>
        2、与公共安全、公共卫生、重大公共利益有关的；<br>
        3、与犯罪侦查、起诉、审判和执行判决等有关的；<br>
        4、有充分证据表明个人信息主体存在主观恶意或滥用权利的；<br>
        5、响应您的请求导致您或其他个人、组织的合法权益受到严重损害的；<br>
        6、涉及商业秘密的。<br>
        （六）个人信息存储期限<br>
        除本隐私政策另有约定，我们将按法律规定的范围内最短期限存储您的个人信息，若超期存储，您可以向我们个人信息保护专职部门反映情况。<br>

        <h3>六、我们如何处理未成年人的个人信息</h3>
        如您为未成年人的，建议您请您的父母或监护人仔细阅读本隐私权政策，并在征得您的父母或监护人同意的前提下使用我们的服务或向我们提供信息。<br>
        对于经父母或监护人同意使用我们的产品或服务而收集未成年人个人信息的情况，我们只会在法律法规允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。<br>

        <h3>七、您的个人信息如何在全球范围转移</h3>
        我们在中华人民共和国境内运营中收集和产生的个人信息，存储在中国境内，以下情形除外：<br>
        1、法律法规有明确规定；<br>
        2、获得您的明确授权；<br>
        3、您通过互联网进行跨境交易等个人主动行为。<br>
        针对以上情形，我们会确保依据本隐私权政策对您的个人信息提供足够的保护。<br>

        <h3>八、本隐私权政策如何更新</h3>
        我们的隐私权政策可能变更。<br>
        我们会在必要时修改隐私政策，请您理解，我们可能会适时修订本隐私政策，并将标注本隐私政策最近更新的日期，更新将于发布时生效。未经您明确同意，我们不会限制您按照本隐私权政策所应享有的权利。对于重大变更，我们还会提供更为显著的通知（包括但不限于对于某些服务，我们会通过万有通告公示等方式，说明隐私权政策的具体变更内容）。请您经常回访本隐私政策，以阅读最新版本。<br>
        本政策所指的重大变更包括但不限于：<br>
        1、我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；<br>
        2、我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等；<br>
        3、个人信息共享、转让或公开披露的主要对象发生变化；<br>
        4、您参与个人信息处理方面的权利及其行使方式发生重大变化；<br>
        5、我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；<br>
        6、个人信息安全影响评估报告表明存在高风险时。<br>

        <h3>九、如何联系我们</h3>
        您可以通过以下方式与我们联系，我们将在15个工作日内回复您的请求：<br>
        1、如对本政策内容有任何疑问、意见或建议，您可通过万有通告专属客服与我们联系；<br>
        2、我们还设立了个人信息保护专职部门，如发现个人信息可能被泄露，您可以通过万有通告专属客服投诉举报；<br>
        3、万有通告专属客服联系邮箱：souhuo001@foxmail.com。<br>

        `,
    };
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["getPrivacyAgreementPopupShow"]),
  },
  methods: {
    ...mapMutations(["SET_PRIVACY_AGREEMENT_POPUP_SHOW"]),
    closeHandler() {
      this.SET_PRIVACY_AGREEMENT_POPUP_SHOW(false);
    },
  }
};
</script>

<style>
page {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
