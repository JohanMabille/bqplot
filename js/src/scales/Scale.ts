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

import * as widgets from '@jupyter-widgets/base';

import {
  ScaleModel
} from './ScaleModel';


export
abstract class Scale extends widgets.WidgetView {
  render() {
    this.offset = 0;
    this.create_d3_scale();
    this.create_event_listeners();
  }

  protected create_event_listeners() {
    this.listenTo(this.model, 'domain_changed', this.model_domain_changed);
    this.listenTo(this.model, 'highlight_axis', this.highlight_axis);
    this.listenTo(this.model, 'unhighlight_axis', this.unhighlight_axis);
  }

  set_range(range: any[], padding) {
    this.scale.range(range);
  }

  compute_and_set_domain(array: any[], id: string) {
    this.model.compute_and_set_domain(array, id);
  }

  set_domain(array: any[], id: string) {
    this.model.set_domain(array, id);
  }

  expand_domain(old_range: any[], new_range: any[]) {
    // Base class function. No implementation.
    // Implementation is particular to the child class
    // if you have a current range and then a new range and want to
    // expand the domain to expand to the new range but keep it
    // consistent with the previous one, this is the function you use.
  }

  protected model_domain_changed() {
    this.scale.domain(this.model.domain);
    this.trigger('domain_changed');
  }

  protected highlight_axis() {
    this.trigger('highlight_axis');
  }

  protected unhighlight_axis() {
    this.trigger('unhighlight_axis');
  }

  protected abstract create_d3_scale();

  offset: number;
  scale: any;

  // Overriding super class
  model: widgets.WidgetModel & ScaleModel;
}
