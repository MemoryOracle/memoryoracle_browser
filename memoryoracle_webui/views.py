#!/usr/bin/env python
# -*- encoding UTF-8 -*-

from pyramid.view import view_config


@view_config(route_name='home', renderer='templates/home.mako')
def my_view(request):
    return {'project': 'MyProject'}
