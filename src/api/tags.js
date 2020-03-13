/**
 * 标签接口
 */
import axios from '../utils/axios';
export default {
  /**
   * 获取标签列表
   * @param params
   */
  async getTagList(params) {
    try {
      const res = await axios.get(`/api/tag/list`, params);
      return res;
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * 新增标签
   * @param params
   */
  async addTag(name,individual_id) {
    try {
      const res = await axios.post(`/api/tag`, {name,individual_id});
      return res;
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * 编辑标签
   * @param params
   */
  async editTag(id,name,individual_id) {
    try {
      const res = await axios.put(`/api/tag/${id}`, {name,individual_id});
      return res;
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * 删除标签
   * @param params
   */
  async deleteTag(id) {
    try {
      const res = await axios.del(`/api/tag/${id}`);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

}
