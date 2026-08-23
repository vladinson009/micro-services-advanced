import { OrderStatus } from '@tickets-vg/common';
import mongoose from 'mongoose';

interface OrderAttrs {
  id: string;
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
}

interface OrderDoc extends mongoose.Document, OrderAttrs {
  //   version: number;
  //   userId: string;
  //   price: number;
  //   status: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): mongoose.HydratedDocument<OrderDoc>;
}
// }

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: OrderStatus,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        const { _id, ...rest } = ret;
        return { ...rest, id: _id };
      },
      // versionKey: false,
    },
    versionKey: 'version',
    optimisticConcurrency: true,
  },
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
