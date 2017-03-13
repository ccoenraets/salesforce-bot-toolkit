({
	render : function(cmp, SL_JumbotronSimpleHelper) {
        var ret = this.superRender();
        SL_JumbotronSimpleHelper.updateRender(cmp);
        return ret;
	},

})