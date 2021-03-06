/*
    Copyright (C) 2014  PencilBlue, LLC

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Creates an object type
 * @class NewObjectTypeActionController
 * @constructor
 * @extends FormController
 */
function NewObjectTypeActionController(){}

//inheritance
util.inherits(NewObjectTypeActionController, pb.BaseController);

NewObjectTypeActionController.prototype.render = function(cb) {
    var self = this;

    var post = self.body;
    post.fields.name = {field_type: 'text'};

    var service = new pb.CustomObjectService();
    service.saveType(post, function(err, result) {
        if(util.isError(err)) {
            cb({
                code: 500,
                content: pb.BaseController.apiResponse(pb.BaseController.API_ERROR, self.ls.get('ERROR_SAVING'))
            });
            return;
        }
        else if(util.isArray(result) && result.length > 0) {
            cb({
                code: 500,
                content: pb.BaseController.apiResponse(pb.BaseController.API_ERROR, self.ls.get('ERROR_SAVING'))
            });
            return;
        }

        cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, post.name + ' ' + self.ls.get('CREATED'), result)});
    });
};

//exports
module.exports = NewObjectTypeActionController;
