# frozen_string_literal: true

ActiveRecord::Schema.define(version: 20_220_327_141_018) do

  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'flights', force: :cascade do |t|
    t.string 'from'
    t.string 'to'
    t.datetime 'departure'
    t.datetime 'arrival'
    t.string 'status'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

end
