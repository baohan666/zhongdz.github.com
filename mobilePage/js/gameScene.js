var size = {
    width : 640,
    height : 1024
}

var beginScene = cc.Scene.extend({
    ctor:function(){
        this._super();

        this.init();

        this.initTopPageView();

        this.initBottomScroll();

        this.initTopBtn();

        this.initRecommendPageView();
    },
    init:function(){
        var gameMain  = new cc.Sprite();
        gameMain.setTextureRect(cc.rect(0, 0, 640, 1024))
        gameMain.setColor(cc.color(255, 255, 255));
        gameMain.x = size.width/2;
        gameMain.y = size.height/2;
        this.addChild(gameMain,0);
    },
    initTopPageView : function(){
        // 页面   
        var pageView = this.pageView = new ccui.PageView();  
        this.pageView.setTouchEnabled(true);  
        this.pageView.setContentSize(size.width, 300);
        pageView.x = 0;
        pageView.y = size.height - 300;
  
        for (var i = 0; i < 4; i++) {  
            // 组织pageview  
            var layout = new ccui.Layout();  
            layout.setContentSize(size.width, 300);  
            var layoutRect = layout.getContentSize();  
  
            var img = new ccui.ImageView();  
            img.loadTexture("res/banner_0"+(i+1)+".png");  
            img.x = layoutRect.width/2;  
            img.y = layoutRect.height/2;  
            layout.addChild(img); 
  
            // 加入到pageview  
            this.pageView.addPage(layout);  
        }  
  
        this.pageView.addEventListener(this.pageViewEvent, this);  
  
        this.addChild(this.pageView); 
    },
    pageViewEvent: function (sender, type) {  
        switch (type) {  
        case ccui.PageView.EVENT_TURNING:  
            var pageView = sender;  
            cc.log("page:" + pageView.getCurPageIndex());  
            break;  
        default:  
            break;  
        }  
    },
    initBottomScroll : function(){
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_BOTH);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(cc.size(640, 800));
     
        scrollView.x = (cc.winSize.width - scrollView.width)/2;
        scrollView.y = (cc.winSize.height - scrollView.height)/2 - 190;
        this.addChild(scrollView);
        
        // addCCSEventListener
        scrollView.addEventListener(this.scrollViewCall, this);

        var scrollContent = this.scrollContent = new cc.Sprite();
        scrollContent.setTextureRect(cc.rect(0, 0, 640, 1000));
        scrollContent.setColor(cc.color.WHITE);
        var scrollContentCs = this.scrollContentCs = scrollContent.getContentSize();
        scrollView.setInnerContainerSize(cc.size(scrollContentCs.width, scrollContentCs.height));

        scrollContent.x = scrollContentCs.width/2 + 0;
        scrollContent.y = scrollView.getInnerContainerSize().height - scrollContentCs.height / 2;
        scrollView.addChild(scrollContent);

        var label = new cc.LabelTTF("------这里是底线------", "Arial", 12);
        label.x = scrollContentCs.width/2;
        label.y = 100;
        label.setColor(cc.color(0, 0, 0));
        scrollContent.addChild(label, 10);
    },
    scrollViewCall:function(sender, type){
        switch (type){
            case ccui.ScrollView.EVENT_SCROLL_TO_TOP:break;
            case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:{
                // console.log('..............................................')
            }break;
            case ccui.ScrollView.EVENT_SCROLL_TO_LEFT:break;
            case ccui.ScrollView.EVENT_SCROLL_TO_RIGHT:break;
            case ccui.ScrollView.EVENT_SCROLLING:break;
            case ccui.ScrollView.EVENT_BOUNCE_TOP:break;
            case ccui.ScrollView.EVENT_BOUNCE_BOTTOM:break;
            case ccui.ScrollView.EVENT_BOUNCE_LEFT:break;
            case ccui.ScrollView.EVENT_BOUNCE_RIGHT:break;
            default:break;
        }
    },
    initTopBtn : function(){
        var btnContainar = new cc.Sprite();
        btnContainar.setTextureRect(cc.rect(0, 0, 640, 200))
        btnContainar.setColor(cc.color(255, 255, 255));
        btnContainar.x = this.scrollContentCs.width/2;
        btnContainar.y = this.scrollContentCs.height - 100;
        this.scrollContent.addChild(btnContainar);

        var btnContainarCs = btnContainar.getContentSize();
        var btnY = btnContainarCs.height/2;
        var centerX = size.width/2;
        this.top_btn_1 = new sprite(btnContainar, res.top_btn_1, centerX - 240, btnY);

        this.top_btn_2 = new sprite(btnContainar, res.top_btn_2, centerX - 80, btnY);

        this.top_btn_3 = new sprite(btnContainar, res.top_btn_3, centerX + 80, btnY);

        this.top_btn_4 = new sprite(btnContainar, res.top_btn_4, centerX + 240, btnY);

        //分割线
        var Draw = new cc.DrawNode();
        var lineY = 0;
        Draw.drawSegment(
           cc.p(0, lineY),// 起点
           cc.p(size.width, lineY), // 终点
           1, // 线粗
           cc.color(0, 0, 0, 50) // 颜色
        );
        btnContainar.addChild(Draw);
    },
    initRecommendPageView : function(){
        // 页面   
        var pageView = this.pageView = new ccui.PageView();  
        this.pageView.setTouchEnabled(true);  
        this.pageView.setContentSize(size.width, 300);
        pageView.x = 0;
        pageView.y = this.scrollContentCs.height - 500;
  
        for (var i = 0; i < 2; i++) {  
            // 组织pageview  
            var layout = new ccui.Layout();  
            layout.setContentSize(size.width, 300);  
            
            this.initRecommendChild(layout);
  
            // 加入到pageview  
            this.pageView.addPage(layout);  
        }  
  
        this.pageView.addEventListener(this.pageViewEvent, this);  
  
        this.scrollContent.addChild(pageView); 
    },
    initRecommendChild : function(_n){
        var layoutRect = _n.getContentSize();
        var img = new ccui.ImageView();
        img.loadTexture("res/recommend.png");
        img.x = layoutRect.width/2;
        img.y = layoutRect.height/2;
        _n.addChild(img);

        var icon_title = new cc.Sprite(res.icon_title);
        icon_title.x = 120;
        icon_title.y = 280;
        img.addChild(icon_title);

        var _icon = new cc.Sprite(res.game_icon_1);
        _icon.x = 100;
        _icon.y = 180;
        img.addChild(_icon);
    }
});

var sprite = cc.Sprite.extend({
    name : 'getPosition',
    ctor : function(_n, _res, _x, _y, _listener, _callFun){
        this._super();
        this.initWithFile(_res);

        this.x = _x == null || undefined ? size.width/2 : _x;

        this.y = _y == null || undefined ? size.height/2 : _y;

        _n.addChild(this);

        this._listener = _listener == null || undefined ? 1 : _listener;

        if(_listener){
            this.loadListener();

            this._callFun = _callFun;
        }
    },
    loadListener : function(){
        var listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
            onTouchBegan    : this.onTouchBegan,
            onTouchMoved    : this.onTouchMoved,
            onTouchEnded    : this.onTouchEnded
        });
        cc.eventManager.addListener(listener, this);
    },
    onTouchBegan: function (touch, event) {
        var self = this.target;
        var locationInNode = self.convertToNodeSpace(touch.getLocation());
        var size = self.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        if (!cc.rectContainsPoint(rect, locationInNode)) {
            return false;
        }
        // 触摸处理
        self.onTouchDispose();
        return true;

    },
    onTouchMoved : function (touch, event) {
        var self = this.target;
        var pos = touch.getLocation();
        if(parseInt(self._listener) == 1){
            self.x = pos.x;
            self.y = pos.y; 
        }
    },
    onTouchEnded : function (touch, event) {
        var self = this.target;
        if(parseInt(self._listener) == 1){
            console.log(Math.ceil(self.x), Math.ceil(self.y));
        }
    },
    onTouchDispose : function(){
        if(this._callFun != null || this._callFun != undefined || typeof(this._callFun) === 'function'){
            this._callFun();
        }
    }
});