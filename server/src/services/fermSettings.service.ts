import { ICreateRequest, IUpdateRequest } from "../dtos/post.dto";
import FermSettings from "../models/fermSettings.model";

class FermService {
  async getFermSettings(id: number) {
    const settings = await FermSettings.findOne({
      where: {
        ferma_id: id,
      },
    });

    return settings?.toJSON();
  }
}

export default new FermService();
