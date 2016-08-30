require('../css/loginAndRegister.css');

var React = require('react'),
	ReactDOM = require('react-dom');

(function() {
	var tabWidth = document.body.clientWidth * 0.9, // tab总宽度
		offset = 70, // 每个tab的宽度    
		left = 13; // 微调到居中   
	var LoginAndRegister = React.createClass({
		getInitialState: function() {
			return ({
				tab: 0
			})
		},
		changeTab: function(resp) {
			var inputs = this.refs.groupInputs.getElementsByTagName('input');
			for (var i = 0, len = inputs.length; i < len; i++) {
				inputs[i].value = '';
			}
			this.setState(resp);
		},
		render: function() {
			var groupInputs = '';
			if (this.state.tab == 0) { // 第一个标签 
				groupInputs = (
					<div className="lar-grounp-inputs" ref="groupInputs"> 
					<Input data="姓名"></Input>     
					<Input data="手机号"></Input>
					<PassworldInput data="密码"></PassworldInput>  
					<ValidateInput data="验证码" imgUrl="https://www.zhihu.com/captcha.gif?r=1472116117193&type=login"></ValidateInput>
				</div>
				)
			} else if (this.state.tab == 1) { // 第二个标签
				groupInputs = (
					<div className="lar-grounp-inputs" ref="groupInputs">
					<Input data="手机号或邮箱"></Input>   
					<PassworldInput data="密码"></PassworldInput>   
				</div>
				)
			}
			return (
				<div style={{minWidth: tabWidth}}>
				<Tab tabs={['注册', '登陆']} handelClick={this.changeTab}></Tab>
				{groupInputs}
				<Btn value='登陆'></Btn>  
			</div>
			)
		}
	});

	var Tab = React.createClass({
		handelClick: function(_this) {
			var normalClass = 'lar-tab-a',
				activeClass = 'lar-tab-a lar-tab-active',
				line = 'lar-line',
				tabWrapChilds = this.refs.tabWrap.children;
			// 标签改变/横线移动   
			for (var i = 0, len = tabWrapChilds.length; i < len; i++) {
				var child = tabWrapChilds[i],
					childIndex = child.getAttribute('data-index'),
					_thisIndex = _this.target.getAttribute('data-index');
				try {
					child.nodeName.toUpperCase() == 'A' && child.setAttribute('data-index', i);
				} catch (e) {
					break;
				}
				if (child.className == activeClass) {
					child.className = normalClass;
				} else if (child.className == line) {
					var position = child.getAttribute('data-initmarginleft') - 0 + (_thisIndex - childIndex) * offset;
					child.style.transition = 'margin-left 200ms';
					child.style.marginLeft = position + 'px';
				}
			}
			_this.target.className = activeClass;
			// 内容改变  
			this.props.handelClick({
				tab: _thisIndex - 0
			});
		},
		render: function() {
			var self = this,
				index = 0,
				tabs = '',
				line = '';
			tabs = this.props.tabs.map(function(tab) {
				var normalClass = 'lar-tab-a',
					activeClass = 'lar-tab-a lar-tab-active';
				return (
					<a href="javascript:void(0);" className={index == 0 ? activeClass : normalClass} key={index++} onClick={self.handelClick.bind(this)}>{tab}</a>
				)
			});
			initMarginLeft = (tabWidth - offset * this.props.tabs.length) / 2 + 13;
			return (
				<div className="lar-tab" ref="tabWrap"> 
				{tabs}   
				<span className="lar-line" data-index={0} style={{marginLeft: initMarginLeft}} ref="line" data-initMarginLeft={initMarginLeft}></span>
			</div>
			)
		}
	});

	var Input = React.createClass({
		render: function() {
			return (
				<div className="lar-input-wrap">  
				<input type="text" placeholder={this.props.data}/>
			</div>
			)
		}
	});

	var PassworldInput = React.createClass({
		render: function() {
			return (
				<div className="lar-input-wrap">
				<input type="password" placeholder={this.props.data}/>
			</div>
			)
		}
	});

	var ValidateInput = React.createClass({
		render: function() {
			return (
				<div className="lar-validateInput-wrap"> 
				<input type="text" maxLength="10" placeholder={this.props.data}/>
				<img src={this.props.imgUrl}/>
			</div>
			)
		}
	});

	var Btn = React.createClass({
		render: function() {
			return (
				<button className="lar-submit">{this.props.value}</button>
			)
		}
	});

	ReactDOM.render(
		<LoginAndRegister></LoginAndRegister>,
		document.getElementById('loginAndRegister')
	);

	window.addEventListener('resize', function() {
		tabWidth = document.body.clientWidth * 0.9;
		ReactDOM.render(
			<LoginAndRegister></LoginAndRegister>,
			document.getElementById('loginAndRegister')
		);
	})
})();