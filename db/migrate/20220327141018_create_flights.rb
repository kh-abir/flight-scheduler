# frozen_string_literal: true

# Schedule a Flight
class CreateFlights < ActiveRecord::Migration[6.1]
  def change
    create_table :flights do |t|
      t.string :from
      t.string :to
      t.datetime :departure
      t.datetime :arrival
      t.string :status

      t.timestamps
    end
  end
end
