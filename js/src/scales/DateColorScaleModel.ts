/* Copyright 2015 Bloomberg Finance L.P.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  ColorScaleModel
} from './ColorScaleModel';

import {
  convert_to_date
} from './LinearScaleModel';

export
class DateColorScaleModel extends ColorScaleModel {
  defaults() {
    return {...super.defaults(),
      _model_name: 'DateColorScaleModel',
      _view_name: 'DateColorScale'
    };
  }

  protected set_init_state() {
    this.type = 'date_color_linear';
    this.color_range = [];
    this.mid = null;
    this.global_min = (new Date()).setTime(0);
    this.global_max = new Date();
  }

  min_max_changed() {
    this.min = convert_to_date(this.get('min'));
    this.max = convert_to_date(this.get('max'));
    this.min_from_data = (this.min === null);
    this.max_from_data = (this.max === null);

    this.update_domain();
  }

  protected toDomainType(value: number) : Date {
    return new Date(value);
  }
}

